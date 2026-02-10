CREATE INDEX IF NOT EXISTS idx_pendingawards_status ON PendingAwards(status);
CREATE INDEX IF NOT EXISTS idx_pendingawards_date_submitted ON PendingAwards(date_submitted DESC);
CREATE INDEX IF NOT EXISTS idx_pendingawards_status_date ON PendingAwards(status, date_submitted DESC);
CREATE INDEX IF NOT EXISTS idx_publications_teaching_id ON Publications(teaching_id);
CREATE INDEX IF NOT EXISTS idx_publications_nonteaching_id ON Publications(nonteaching_id);
