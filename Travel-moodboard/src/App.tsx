import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/home-page";
import MoodBoardPage from "@/pages/mood-board-page";
import NotFound from "@/pages/not-found";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gradient-to-b from-background to-muted">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/mood-board/:id?" component={MoodBoardPage} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </main>
    </QueryClientProvider>
  );
}