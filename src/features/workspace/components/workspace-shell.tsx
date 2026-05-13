import { AppFooter } from "@/features/workspace/components/app-footer";
import { AppHeader } from "@/features/workspace/components/app-header";
import { WorkspaceContent } from "@/features/workspace/components/workspace-content";

export function WorkspaceShell() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_var(--background),_color-mix(in_srgb,var(--background),white_14%))] dark:bg-[linear-gradient(180deg,_var(--background),_color-mix(in_srgb,var(--background),white_4%))]">
      <div className="flex min-h-screen w-full flex-col px-4 sm:px-6 lg:px-8">
        <AppHeader />
        <WorkspaceContent />
        <AppFooter />
      </div>
    </div>
  );
}
