import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SettingsHeader } from "../SettingsHeader";
import { SettingsSection } from "../SettingsSection";
import { SettingsRow } from "../SettingsRow";
import { Camera, Github, Chrome, Smartphone, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function AccountSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Account & Profile" 
        description="Manage your personal information, security, and connected accounts"
      />

      <SettingsSection title="Profile Information">
        <div className="flex items-center gap-6 pb-6 border-b border-border">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary text-xl font-semibold">JD</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">Profile Photo</h4>
            <p className="text-sm text-muted-foreground">PNG, JPG up to 2MB</p>
          </div>
        </div>

        <div className="grid gap-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">First Name</label>
              <Input placeholder="John" defaultValue="John" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Last Name</label>
              <Input placeholder="Doe" defaultValue="Doe" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Email Address</label>
            <div className="flex items-center gap-3">
              <Input placeholder="john@example.com" defaultValue="john@example.com" disabled className="flex-1" />
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">Verified</Badge>
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Connected Accounts" description="Link third-party accounts for faster login">
        <SettingsRow label="Google" description="Sign in with your Google account">
          <Button variant="outline" size="sm" className="gap-2">
            <Chrome className="h-4 w-4" />
            Connect
          </Button>
        </SettingsRow>
        <SettingsRow label="GitHub" description="Sign in with your GitHub account">
          <Button variant="outline" size="sm" className="gap-2 border-emerald-500/50 text-emerald-400">
            <Github className="h-4 w-4" />
            Connected
          </Button>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Active Sessions" description="Manage your logged-in devices">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">MacBook Pro · Chrome</p>
                <p className="text-xs text-muted-foreground">San Francisco, CA · Active now</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400">Current</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">iPhone 15 · Safari</p>
                <p className="text-xs text-muted-foreground">New York, NY · 2 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              Revoke
            </Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Security">
        <SettingsRow label="Change Password" description="Update your password regularly for security">
          <Button variant="outline" size="sm">
            Update Password
          </Button>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Danger Zone">
        <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div>
            <h4 className="font-medium text-foreground">Delete Account</h4>
            <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
          </div>
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </SettingsSection>
    </div>
  );
}
