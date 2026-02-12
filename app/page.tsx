import ValentineProposal from "@/components/ValentineProposal";
import FloatingHearts from "@/components/FloatingHearts";

export default function Home() {
  return (
    <main>
      {/* Page-level floating hearts (also available site-wide via layout) */}
      <FloatingHearts />

      <ValentineProposal />

    </main>
  );
}
