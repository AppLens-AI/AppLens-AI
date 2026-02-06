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
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export function EditorSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Editor Preferences"
        description="Customize your canvas editor behavior and defaults"
      />

      <SettingsSection
        title="Canvas Defaults"
        description="Default settings for new projects"
      >
        <SettingsRow
          label="Default Background Color"
          description="Background color for new canvases"
        >
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg border border-border bg-neutral-900" />
            <Input className="w-28" defaultValue="#0a0a0a" />
          </div>
        </SettingsRow>
        <SettingsRow
          label="Safe Area Padding"
          description="Padding for notch and home indicator"
        >
          <div className="flex items-center gap-3">
            <Slider
              defaultValue={[44]}
              max={60}
              min={0}
              step={4}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground w-12">44px</span>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Text Defaults"
        description="Default text styling for new text elements"
      >
        <SettingsRow label="Default Font Family">
          <Select defaultValue="inter">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="sf-pro">SF Pro Display</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="poppins">Poppins</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
      </SettingsSection>
    </div>
  );
}
