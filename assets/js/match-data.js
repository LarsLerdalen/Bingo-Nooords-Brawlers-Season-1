(function() {
  function getLeaderboard(data) {
    const leaderboard = {};

    data.players.forEach(p => {
      leaderboard[p.id] = {
        Player: p.id,
        G: 0,
        W: 0,
        L: 0,
        P: 0,
        S: 0,
        Ln: 0,
        WR: "0%"
      };
    });
  
    data.games.forEach(gw => {
      gw.matches.forEach(match => {
        const { player1, player2,  player1Score, player2Score, bingo, bingoWinner } = match;

        if (player1Score === null || player2Score === null) return; 
  
        leaderboard[player1].G++;
        leaderboard[player2].G++;
  
        leaderboard[player1].S += player1Score;
        leaderboard[player2].S += player2Score;
  
        leaderboard[player1].P += player1Score;
        leaderboard[player2].P += player2Score;

        let winner;
        let loser;
        
        if (bingo) {
          winner = bingoWinner;
          loser = bingoWinner === player1 ? player2 : player1;
          leaderboard[bingoWinner].Ln++;
          leaderboard[bingoWinner].P += 2;
        } else {
          winner = player1Score > player2Score 
          ? player1 
          : player1Score < player2Score 
          ? player2 : null;
         
          loser = player1Score > player2Score 
          ? player2 
          : player1Score < player2Score 
          ? player1 : null;
        }
        
        if (winner && loser) {
          leaderboard[loser].L++;
          leaderboard[winner].W++;
        } 
      });
    });
  
    Object.values(leaderboard).forEach(p => {
      p.WR = p.G > 0 ? Math.round((p.W / p.G) * 100) + "%" : "0%";
    });
  
    return Object.values(leaderboard).sort((a, b) => {
      const wrA = parseInt(a.WR);
      const wrB = parseInt(b.WR);
      if (wrA !== wrB) return wrB - wrA; 
      return b.P - a.P; 
    });
  }
  
  function getAllMatches(data) {
    return data.games.flatMap(gw =>
      gw.matches.map(m => ({
        gameweek: gw.gameweek,
        weeks: gw.weeks,
        dates: gw.dates,
        ...m
      }))
    );
  }

  window.bingoFunctions = {
    getLeaderboard,
    getAllMatches  
  }
})()
  