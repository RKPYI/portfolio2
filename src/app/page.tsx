import { getPortfolioFile } from "@/lib/github";
import PortfolioApp from "@/components/PortfolioApp";

// Always fetch fresh content from GitHub — never statically cache — so
// edits committed via the API route show up immediately on reload.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { data } = await getPortfolioFile();
  return <PortfolioApp initialData={data} />;
}
