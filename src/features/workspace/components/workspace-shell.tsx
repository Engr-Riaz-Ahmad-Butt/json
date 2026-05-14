import { AppFooter } from "@/features/workspace/components/app-footer";
import { AppHeader } from "@/features/workspace/components/app-header";
import { WorkspaceContent } from "@/features/workspace/components/workspace-content";

export function WorkspaceShell() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f1ea]">
      <div className="flex min-h-screen w-full flex-col">
        <AppHeader />
        <WorkspaceContent />
        <AppFooter />
      </div>
    </div>
  );
}
