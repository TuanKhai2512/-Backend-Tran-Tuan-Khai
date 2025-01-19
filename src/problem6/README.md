# Live Scoreboard System Specification

## Overview
This document outlines the specification for a real-time scoreboard system that tracks and displays the top 10 user scores. The system ensures secure score updates and provides live updates to connected clients.

## Core Components

### 1. Authentication Service
- Validates JWT tokens for all score update requests
- Ensures only authenticated users can update scores
- Maintains user session management

### 2. Score Service
- Handles score updates and leaderboard calculations
- Implements rate limiting to prevent abuse
- Manages data consistency between cache and database

### 3. WebSocket Server
- Maintains real-time connections with clients
- Broadcasts score updates to all connected clients
- Handles connection management and heartbeat

### 4. Cache Layer (Redis)
- Stores sorted set of top scores for quick access
- Maintains temporary score update history
- Reduces database load for frequent leaderboard queries

## API Endpoints

### Score Update
POST /api/v1/scores/update
Authorization: Bearer {jwt_token}
Content-Type: application/json
Request:
{
"actionId": "string", // Unique identifier for the scoring action
"timestamp": "ISO8601" // When the action occurred
}
Response:
{
"success": boolean,
"newScore": number,
"rank": number
}

### Fetch Leaderboard
GET /api/v1/scores/leaderboard
Response:
{
"leaderboard": [
{
"userId": "string",
"username": "string",
"score": number,
"rank": number
}
],
"lastUpdated": "ISO8601"
}

## WebSocket Events

### Connection
ws://api.domain.com/ws/scoreboard
Headers:
Authorization: Bearer {jwt_token}

### Event Types

```javascript
// Server -> Client
{
"type": "SCORE_UPDATE",
"data": {
"userId": "string",
"newScore": number,
"rank": number,
"timestamp": "ISO8601"
}
}
// Server -> Client
{
"type": "LEADERBOARD_UPDATE",
"data": {
"leaderboard": [/ top 10 users /],
"timestamp": "ISO8601"
}
}
```

## Security Measures

1. **Authentication**
   - All requests must include valid JWT tokens
   - Tokens expire after 1 hour
   - WebSocket connections require initial authentication

2. **Rate Limiting**
   - Maximum 10 score updates per minute per user
   - WebSocket reconnection backoff strategy

3. **Action Validation**
   - Each score update must include a valid actionId
   - Duplicate actionIds are rejected
   - Timestamps must be within acceptable range (±5 minutes)

## Data Storage

### User Scores (Database)

```sql
CREATE TABLE user_scores (
user_id VARCHAR(36) PRIMARY KEY,
total_score BIGINT NOT NULL DEFAULT 0,
last_updated TIMESTAMP NOT NULL,
action_history JSONB
);
CREATE INDEX idx_total_score ON user_scores(total_score DESC);
```

### Score Actions (Database)

```sql
CREATE TABLE score_actions (
action_id VARCHAR(36) PRIMARY KEY,
user_id VARCHAR(36) NOT NULL,
timestamp TIMESTAMP NOT NULL,
points INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Cache Structure (Redis)

1. Leaderboard Sorted Set
Key: "leaderboard:global"
Type: ZSET
Structure: {score -> user_id}

2. User Score Cache
Key: "user:score:{user_id}"
Type: HASH
Fields: {
total_score: number,
last_updated: timestamp
}


## Implementation Notes

1. **Scalability Considerations**
   - Implement horizontal scaling for WebSocket servers
   - Use Redis Cluster for cache distribution
   - Consider sharding for user score data

2. **Monitoring Requirements**
   - Track WebSocket connection counts
   - Monitor score update latency
   - Alert on unusual score patterns

3. **Error Handling**
   - Implement retry mechanism for failed updates
   - Maintain audit log for suspicious activities
   - Handle WebSocket reconnection gracefully

## Future Improvements

1. Add support for multiple leaderboards (daily, weekly, monthly)
2. Implement achievement system
3. Add historical leaderboard data
4. Support for team/group scores
5. Add anti-cheat detection system
6. Implement score decay mechanism