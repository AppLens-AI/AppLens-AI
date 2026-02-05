import { useState } from "react";
import { SettingsHeader } from "../SettingsHeader";
import { SettingsSection } from "../SettingsSection";
import { SettingsRow } from "../SettingsRow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export function ExportSettings() {
  const [includeFrame, setIncludeFrame] = useState(true);
  const [transparent, setTransparent] = useState(false);
  const [zipExport, setZipExport] = useState(true);
  const [quality, setQuality] = useState([90]);

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Export Settings" 
        description="Configure default export formats, quality, and file naming"
      />

      <SettingsSection title="Format & Quality">
        <SettingsRow label="Default Export Format" description="Preferred image format for exports">
          <Select defaultValue="png">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow label="Image Quality" description="Higher quality = larger file size">
          <div className="flex items-center gap-3">
            <Slider 
              value={quality} 
              onValueChange={setQuality} 
              max={100} 
              min={50} 
              step={5} 
              className="w-28" 
            />
            <span className="text-sm text-muted-foreground w-12">{quality}%</span>
          </div>
        </SettingsRow>
        <SettingsRow label="Include Device Frame" description="Export with device mockup frame">
          <Switch checked={includeFrame} onCheckedChange={setIncludeFrame} />
        </SettingsRow>
        <SettingsRow label="Transparent Background" description="Export with transparent background (PNG only)">
          <Switch checked={transparent} onCheckedChange={setTransparent} />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="File Naming" description="Customize exported file names">
        <SettingsRow label="Naming Format" description="Pattern for exported file names">
          <Select defaultValue="project-slide">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project-slide">{"{project}-{slide}"}</SelectItem>
              <SelectItem value="project-platform-slide">{"{project}-{platform}-{slide}"}</SelectItem>
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

      <SettingsSection title="Batch Export" description="Settings for exporting multiple slides">
        <SettingsRow label="Export as ZIP" description="Bundle all exports in a single ZIP file" isPro>
          <Switch checked={zipExport} onCheckedChange={setZipExport} />
        </SettingsRow>
        <SettingsRow label="Separate by Platform" description="Create folders for iOS and Android">
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow label="Include Metadata" description="Add JSON file with export details">
          <Switch />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Resolution Presets">
        <div className="space-y-3">
          {[
            { name: "App Store", size: "1290 × 2796", enabled: true },
            { name: "Play Store", size: "1080 × 1920", enabled: true },
            { name: "Feature Graphic", size: "1024 × 500", enabled: false },
          ].map((preset) => (
            <div key={preset.name} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{preset.name}</p>
                <p className="text-xs text-muted-foreground">{preset.size}</p>
              </div>
              <Switch defaultChecked={preset.enabled} />
            </div>
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}
