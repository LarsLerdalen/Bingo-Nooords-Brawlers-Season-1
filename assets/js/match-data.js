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
  
        leaderboard[player1].P += player1Score - player2Score;
        leaderboard[player2].P += player2Score - player1Score;

        if (player1Score > player2Score) {
          leaderboard[player1].W++;
          leaderboard[player2].L++;
        } else if (player2Score > player1Score) {
          leaderboard[player2].W++;
          leaderboard[player1].L++;
        }  

        if (bingo && bingoWinner) {
          leaderboard[bingoWinner].Ln++;
          leaderboard[bingoWinner].P += 2;
        }
      });
    });
  
    Object.values(leaderboard).forEach(p => {
      p.WR = p.games > 0 ? Math.round((p.wins / p.games) * 100) + "%" : "0%";
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
  