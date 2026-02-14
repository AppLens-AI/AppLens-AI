import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Bug,
  Lightbulb,
  MessageSquare,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminApi } from "@/lib/api";
import {
  Feedback,
  FeedbackType,
  FeedbackStatus,
  FeedbackPriority,
} from "@/types";
import { toast } from "sonner";

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FeedbackType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | "all">(
    "all",
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null,
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");

  const limit = 10;

  useEffect(() => {
    fetchFeedback();
  }, [page, typeFilter, statusFilter]);

  const fetchFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminApi.getAllFeedback(
        page,
        limit,
        typeFilter === "all" ? undefined : typeFilter,
        statusFilter === "all" ? undefined : statusFilter,
      );
      if (response.data?.success) {
        setFeedback(response.data.data.feedback || []);
        setTotalPages(Math.ceil((response.data.data.total || 0) / limit));
      } else {
        setError(response.data?.message || "Failed to load feedback");
      }
    } catch (err) {
      setError("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    feedbackId: string,
    status: FeedbackStatus,
  ) => {
    setActionLoading(true);
    try {
      const response = await adminApi.updateFeedback(feedbackId, {
        status,
        adminResponse: adminResponse || undefined,
      });
      if (response.data?.success) {
        toast.success(`Feedback status updated to ${status}`);
        setShowDetailModal(false);
        setSelectedFeedback(null);
        setAdminResponse("");
        fetchFeedback();
      } else {
        toast.error(response.data?.message || "Failed to update feedback");
      }
    } catch (err) {
      toast.error("Failed to update feedback");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdatePriority = async (
    feedbackId: string,
    priority: FeedbackPriority,
  ) => {
    setActionLoading(true);
    try {
      const response = await adminApi.updateFeedback(feedbackId, { priority });
      if (response.data?.success) {
        toast.success(`Priority updated to ${priority}`);
        fetchFeedback();
      } else {
        toast.error(response.data?.message || "Failed to update priority");
      }
    } catch (err) {
      toast.error("Failed to update priority");
    } finally {
      setActionLoading(false);
    }
  };

  const getTypeIcon = (type: FeedbackType) => {
    switch (type) {
      case "bug_report":
        return <Bug className="h-4 w-4 text-red-500" />;
      case "feature_request":
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusIcon = (status: FeedbackStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "in_progress":
        return <ArrowUpCircle className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "closed":
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: FeedbackStatus) => {
    const styles: Record<FeedbackStatus, string> = {
      pending: "bg-yellow-500/10 text-yellow-500",
      in_progress: "bg-blue-500/10 text-blue-500",
      resolved: "bg-green-500/10 text-green-500",
      closed: "bg-gray-500/10 text-gray-500",
    };
    const labels: Record<FeedbackStatus, string> = {
      pending: "Pending",
      in_progress: "In Progress",
      resolved: "Resolved",
      closed: "Closed",
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getPriorityBadge = (priority: FeedbackPriority) => {
    const styles: Record<FeedbackPriority, string> = {
      low: "bg-gray-500/10 text-gray-500",
      medium: "bg-yellow-500/10 text-yellow-500",
      high: "bg-orange-500/10 text-orange-500",
      critical: "bg-red-500/10 text-red-500",
    };
    return (
      <span
        className={`text-xs px-2 py-1 rounded-full capitalize ${styles[priority]}`}
      >
        {priority}
      </span>
    );
  };

  const filteredFeedback = feedback.filter((fb) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      fb.title.toLowerCase().includes(query) ||
      fb.description.toLowerCase().includes(query)
    );
  });

  if (loading && feedback.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error && feedback.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-lg text-muted-foreground">{error}</p>
        <button
          onClick={fetchFeedback}
          className="text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Feedback</h1>
        <p className="text-muted-foreground mt-1">
          Manage user feedback, bug reports, and feature requests
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as FeedbackType | "all");
              setPage(1);
            }}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="all">All Types</option>
            <option value="bug_report">Bug Reports</option>
            <option value="feature_request">Feature Requests</option>
            <option value="general">General</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as FeedbackStatus | "all");
              setPage(1);
            }}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((fb) => (
          <div
            key={fb.id}
            className="rounded-xl border border-border bg-card p-4 hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                {getTypeIcon(fb.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{fb.title}</h3>
                    {getStatusBadge(fb.status)}
                    {getPriorityBadge(fb.priority)}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {fb.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>From: {fb.userName || "Anonymous"}</span>
                    <span>{new Date(fb.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={fb.priority}
                  onChange={(e) =>
                    handleUpdatePriority(
                      fb.id,
                      e.target.value as FeedbackPriority,
                    )
                  }
                  className="px-2 py-1 rounded border border-input bg-background text-xs"
                  disabled={actionLoading}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedFeedback(fb);
                    setAdminResponse(fb.adminResponse || "");
                    setShowDetailModal(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredFeedback.length} of {feedback.length} items
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-xl p-6 w-full max-w-2xl mx-4 border border-border max-h-[80vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              {getTypeIcon(selectedFeedback.type)}
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedFeedback.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  From {selectedFeedback.userName || "Anonymous"} •{" "}
                  {new Date(selectedFeedback.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Description
                </label>
                <p className="mt-1 p-3 rounded-lg bg-secondary/30 text-sm">
                  {selectedFeedback.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Type
                  </label>
                  <p className="mt-1 capitalize">
                    {selectedFeedback.type.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Priority
                  </label>
                  <p className="mt-1">
                    {getPriorityBadge(selectedFeedback.priority)}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Status
                </label>
                <div className="flex gap-2">
                  {(
                    [
                      "pending",
                      "in_progress",
                      "resolved",
                      "closed",
                    ] as FeedbackStatus[]
                  ).map((status) => (
                    <Button
                      key={status}
                      variant={
                        selectedFeedback.status === status
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(selectedFeedback.id, status)
                      }
                      disabled={
                        actionLoading || selectedFeedback.status === status
                      }
                      className="capitalize"
                    >
                      {getStatusIcon(status)}
                      <span className="ml-1">{status.replace("_", " ")}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Admin Response (Optional)
                </label>
                <textarea
                  className="w-full h-24 px-3 py-2 text-sm rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Add a response to the user..."
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedFeedback(null);
                    setAdminResponse("");
                  }}
                >
                  Close
                </Button>
                <Button
                  className="flex-1"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedFeedback.id,
                      selectedFeedback.status,
                    )
                  }
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
