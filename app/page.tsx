import { Greeting } from "@/components/home/Greeting";
import { TopBar } from "@/components/shell/TopBar";
import { Bento } from "@/components/home/Bento";
import { HomeBehavior } from "@/components/home/HomeBehavior";

export default function Home() {
  return (
    <>
      <Greeting />
      <TopBar />
      <Bento />
      <HomeBehavior />
    </>
  );
}
