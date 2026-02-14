import { useState } from "react";
import { Send, Loader2, Bell, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminApi } from "@/lib/api";
import { toast } from "sonner";

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleBroadcast = async () => {
    if (!title.trim()) {
      toast.error("Please enter a notification title");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter a notification message");
      return;
    }

    setSending(true);
    try {
      const response = await adminApi.broadcastNotification(title, message);
      if (response.data?.success) {
        toast.success("Notification sent to all users!");
        setSent(true);
        setTitle("");
        setMessage("");
        setTimeout(() => setSent(false), 3000);
      } else {
        toast.error(response.data?.message || "Failed to send notification");
      }
    } catch (err) {
      toast.error("Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground mt-1">
          Send broadcast notifications to all users
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Broadcast Form */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Broadcast Notification</h2>
              <p className="text-sm text-muted-foreground">
                Send a notification to all users
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input
                placeholder="Notification title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Message</label>
              <textarea
                className="w-full h-32 px-3 py-2 text-sm rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Write your notification message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button
              className="w-full gap-2"
              onClick={handleBroadcast}
              disabled={sending || sent}
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : sent ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {sending ? "Sending..." : sent ? "Sent!" : "Send to All Users"}
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-6">Preview</h2>

          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-sm">
                    {title || "Notification Title"}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    Just now
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {message || "Your notification message will appear here..."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Broadcasting to all users</p>
                <p className="text-xs mt-1 opacity-80">
                  This notification will be sent to all registered users in the
                  system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="font-semibold mb-4">Notification Tips</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-secondary/30">
            <h3 className="font-medium text-sm mb-2">Keep it concise</h3>
            <p className="text-xs text-muted-foreground">
              Users are more likely to read short, clear messages.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30">
            <h3 className="font-medium text-sm mb-2">Be relevant</h3>
            <p className="text-xs text-muted-foreground">
              Only send notifications that provide value to users.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30">
            <h3 className="font-medium text-sm mb-2">Include action</h3>
            <p className="text-xs text-muted-foreground">
              When possible, tell users what they can do next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
