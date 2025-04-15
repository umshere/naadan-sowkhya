'use client';

import * as React from "react";
import { Grid2X2, List, LayoutGrid } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type ViewMode = "grid" | "list" | "compact";

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={currentView}
      onValueChange={(value) => {
        if (value) onViewChange(value as ViewMode);
      }}
      className="justify-center"
    >
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid2X2 className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="compact" aria-label="Compact view">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
