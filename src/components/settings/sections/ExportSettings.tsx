import { useState } from "react";
import { SettingsHeader } from "../SettingsHeader";
import { SettingsSection } from "../SettingsSection";
import { SettingsRow } from "../SettingsRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export function ExportSettings() {
  const [zipExport, setZipExport] = useState(true);

  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Export Settings"
        description="Configure default export formats, quality, and file naming"
      />

      <SettingsSection
        title="File Naming"
        description="Customize exported file names"
      >
        <SettingsRow
          label="Naming Format"
          description="Pattern for exported file names"
        >
          <Select defaultValue="project-slide">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project-slide">
                {"{project}-{slide}"}
              </SelectItem>
              <SelectItem value="project-platform-slide">
                {"{project}-{platform}-{slide}"}
              </SelectItem>
              <SelectItem value="custom">Custom Pattern</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow label="Preview">
          <Badge variant="secondary" className="font-mono text-xs">
            my-app-ios-01.png
          </Badge>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Batch Export"
        description="Settings for exporting multiple slides"
      >
        <SettingsRow
          label="Separate by Platform"
          description="Create folders for iOS and Android"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow
          label="Include Metadata"
          description="Add JSON file with export details"
        >
          <Switch />
        </SettingsRow>
      </SettingsSection>
    </div>
  );
}
