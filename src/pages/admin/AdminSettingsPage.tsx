import { useState, useEffect } from "react";
import { Settings, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appApi } from "@/lib/api";
import { AppInfo } from "@/types";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppInfo();
  }, []);

  const fetchAppInfo = async () => {
    setLoading(true);
    try {
      const response = await appApi.getInfo();
      if (response.data?.success) {
        setAppInfo(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch app info");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Application configuration and system information
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* App Information */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Application Info</h2>
              <p className="text-sm text-muted-foreground">
                Current application status
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="font-medium">{appInfo?.version || "1.0.0"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Environment</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  appInfo?.environment === "production"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {appInfo?.environment || "development"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Build Date</span>
              <span className="font-mono text-sm">
                {appInfo?.buildDate || new Date().toISOString().split("T")[0]}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-muted-foreground">Status</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-500">Healthy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Flags */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-6">Feature Flags</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-sm">OAuth Login</p>
                <p className="text-xs text-muted-foreground">
                  Allow Google and GitHub login
                </p>
              </div>
              <div className="h-6 w-11 rounded-full bg-green-500 relative cursor-not-allowed opacity-70">
                <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-sm">User Registration</p>
                <p className="text-xs text-muted-foreground">
                  Allow new user signups
                </p>
              </div>
              <div className="h-6 w-11 rounded-full bg-green-500 relative cursor-not-allowed opacity-70">
                <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-sm">Email Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Send email notifications to users
                </p>
              </div>
              <div className="h-6 w-11 rounded-full bg-gray-500 relative cursor-not-allowed opacity-70">
                <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Feature flags are configured via environment variables and require a
            server restart to change.
          </p>
        </div>
      </div>

      {/* Maintenance Mode Notice */}
      <div className="mt-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6">
        <h2 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
          Maintenance Mode
        </h2>
        <p className="text-sm text-yellow-600/80 dark:text-yellow-400/80 mb-4">
          Maintenance mode is currently disabled. When enabled, users will see a
          maintenance page and won't be able to access the application.
        </p>
        <Button variant="outline" disabled className="opacity-50">
          Enable Maintenance Mode
        </Button>
      </div>
    </div>
  );
}
