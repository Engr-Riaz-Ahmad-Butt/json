import WorkspaceSidebar from "@/components/workspace/WorkspaceSidebar";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import JsonEditor from "@/components/workspace/JsonEditor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor — JSONKit Pro Workspace",
  description: "Edit, format, and validate JSON with the JSONKit terminal-inspired editor.",
};

export default function WorkspacePage() {
  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#080808", color: "#F5F1EA" }}
    >
      {/* Left Sidebar */}
      <WorkspaceSidebar active="Editor" />

      {/* Main column */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Top Header */}
        <WorkspaceHeader />

        {/* Editor + Right Sidebar */}
        <main className="flex flex-grow overflow-hidden">
          <JsonEditor />
        </main>
      </div>
    </div>
  );
}
