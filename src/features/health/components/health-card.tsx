import { useHealth } from "@/features/health/hooks/use-health";

export function HealthCard() {
  const { data, isLoading, isFetching, error, refetch } = useHealth();

  if (isLoading) {
    return (
      <article className="health-card">
        <h2>Backend Health</h2>
        <p>Checking service status...</p>
      </article>
    );
  }

  if (error) {
    return (
      <article className="health-card health-card--danger">
        <h2>Backend Health</h2>
        <p>{error.message}</p>
        <button className="btn btn--primary" type="button" onClick={() => void refetch()}>
          Retry
        </button>
      </article>
    );
  }

  return (
    <article className="health-card">
      <h2>Backend Health</h2>
      <dl className="health-list">
        <div>
          <dt>Service</dt>
          <dd>{data?.service}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>
            <span className="status-pill">{data?.status}</span>
          </dd>
        </div>
        <div>
          <dt>Timestamp</dt>
          <dd>{data?.timestamp}</dd>
        </div>
      </dl>
      <button
        className="btn btn--primary"
        type="button"
        onClick={() => void refetch()}
        disabled={isFetching}
      >
        {isFetching ? "Refreshing..." : "Refresh"}
      </button>
    </article>
  );
}
