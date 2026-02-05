import { useState } from "react";
import { SettingsHeader } from "../SettingsHeader";
import { SettingsSection } from "../SettingsSection";
import { SettingsRow } from "../SettingsRow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export function EditorSettings() {
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  const [showFrame, setShowFrame] = useState(true);
  const [autoResize, setAutoResize] = useState(false);
  const [autoSelectTop, setAutoSelectTop] = useState(true);
  const [lockAspect, setLockAspect] = useState(false);

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Editor Preferences" 
        description="Customize your canvas editor behavior and defaults"
      />

      <SettingsSection title="Canvas Defaults" description="Default settings for new projects">
        <SettingsRow label="Default Background Color" description="Background color for new canvases">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg border border-border bg-neutral-900" />
            <Input className="w-28" defaultValue="#0a0a0a" />
          </div>
        </SettingsRow>
        <SettingsRow label="Default Device Type" description="Pre-selected device for new projects">
          <Select defaultValue="iphone">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iphone">iPhone 15 Pro</SelectItem>
              <SelectItem value="iphone-max">iPhone 15 Pro Max</SelectItem>
              <SelectItem value="android">Pixel 8 Pro</SelectItem>
              <SelectItem value="android-fold">Galaxy Fold</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow label="Default Orientation">
          <Select defaultValue="portrait">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow label="Show Device Frame" description="Display device mockup frame by default">
          <Switch checked={showFrame} onCheckedChange={setShowFrame} />
        </SettingsRow>
        <SettingsRow label="Safe Area Padding" description="Padding for notch and home indicator">
          <div className="flex items-center gap-3">
            <Slider defaultValue={[44]} max={60} min={0} step={4} className="w-24" />
            <span className="text-sm text-muted-foreground w-12">44px</span>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Snapping & Alignment" description="Control element positioning behavior">
        <SettingsRow label="Snap to Grid" description="Align elements to grid lines">
          <Switch checked={snapToGrid} onCheckedChange={setSnapToGrid} />
        </SettingsRow>
        <SettingsRow label="Grid Size" description="Spacing between grid lines">
          <Select defaultValue="8">
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4px</SelectItem>
              <SelectItem value="8">8px</SelectItem>
              <SelectItem value="16">16px</SelectItem>
              <SelectItem value="32">32px</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow label="Snap to Edges" description="Snap to other element edges">
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow label="Show Alignment Guides" description="Display smart guides while moving">
          <Switch checked={showGuides} onCheckedChange={setShowGuides} />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Text Defaults" description="Default text styling for new text elements">
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
        <SettingsRow label="Default Font Size">
          <Select defaultValue="16">
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12px</SelectItem>
              <SelectItem value="14">14px</SelectItem>
              <SelectItem value="16">16px</SelectItem>
              <SelectItem value="18">18px</SelectItem>
              <SelectItem value="24">24px</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow label="Default Text Color">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg border border-border bg-white" />
            <Input className="w-28" defaultValue="#ffffff" />
          </div>
        </SettingsRow>
        <SettingsRow label="Auto-resize Text" description="Automatically resize text to fit container">
          <Switch checked={autoResize} onCheckedChange={setAutoResize} />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Layer Behavior" description="Default layer and transform settings">
        <SettingsRow label="Auto-select Top Layer" description="Select the topmost layer when clicking">
          <Switch checked={autoSelectTop} onCheckedChange={setAutoSelectTop} />
        </SettingsRow>
        <SettingsRow label="Lock Aspect Ratio" description="Maintain proportions when resizing">
          <Switch checked={lockAspect} onCheckedChange={setLockAspect} />
        </SettingsRow>
        <SettingsRow label="Default Z-Index">
          <Select defaultValue="auto">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="top">Always Top</SelectItem>
              <SelectItem value="bottom">Always Bottom</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow label="Duplicate Offset" description="Offset when duplicating elements">
          <div className="flex items-center gap-3">
            <Slider defaultValue={[20]} max={50} min={5} step={5} className="w-24" />
            <span className="text-sm text-muted-foreground w-12">20px</span>
          </div>
        </SettingsRow>
      </SettingsSection>
    </div>
  );
}
