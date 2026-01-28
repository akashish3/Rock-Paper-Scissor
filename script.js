import java.util.*;

class Solution {
    public int minCost(int[][] grid, int k) {
        int m = grid.length, n = grid[0].length;
        int total = m * n;

        // Flatten grid into sorted list
        List<int[]> cells = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                cells.add(new int[]{grid[i][j], i, j});
            }
        }
        cells.sort(Comparator.comparingInt(a -> a[0]));

        // dist[i][j][t] = min cost
        int[][][] dist = new int[m][n][k+1];
        for (int[][] arr : dist) for (int[] row : arr) Arrays.fill(row, Integer.MAX_VALUE);

        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        dist[0][0][k] = 0;
        pq.offer(new int[]{0, 0, 0, k}); // cost, i, j, teleports

        // prefix minima for teleportation
        int[][] prefixBest = new int[k+1][total];
        for (int[] arr : prefixBest) Arrays.fill(arr, Integer.MAX_VALUE);

        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int cost = cur[0], i = cur[1], j = cur[2], t = cur[3];
            if (i == m-1 && j == n-1) return cost;
            if (cost > dist[i][j][t]) continue;

            // Normal moves
            if (i+1 < m) {
                int newCost = cost + grid[i+1][j];
                if (newCost < dist[i+1][j][t]) {
                    dist[i+1][j][t] = newCost;
                    pq.offer(new int[]{newCost, i+1, j, t});
                }
            }
            if (j+1 < n) {
                int newCost = cost + grid[i][j+1];
                if (newCost < dist[i][j+1][t]) {
                    dist[i][j+1][t] = newCost;
                    pq.offer(new int[]{newCost, i, j+1, t});
                }
            }

            // Teleport moves
            if (t > 0) {
                // find prefix index for grid[i][j]
                int idx = upperBound(cells, grid[i][j]);
                // update prefixBest
                if (cost < prefixBest[t][idx-1]) {
                    prefixBest[t][idx-1] = cost;
                    // teleport to all cells in prefix
                    for (int p = 0; p < idx; p++) {
                        int x = cells.get(p)[1], y = cells.get(p)[2];
                        if (cost < dist[x][y][t-1]) {
                            dist[x][y][t-1] = cost;
                            pq.offer(new int[]{cost, x, y, t-1});
                        }
                    }
                }
            }
        }
        return -1;
    }

    private int upperBound(List<int[]> cells, int val) {
        int l = 0, r = cells.size();
        while (l < r) {
            int mid = (l + r) / 2;
            if (cells.get(mid)[0] <= val) l = mid + 1;
            else r = mid;
        }
        return l;
    }
}
