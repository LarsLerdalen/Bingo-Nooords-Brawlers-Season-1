(function() {
  function convertTime(timeString) {
    const n = timeString.split(":").map(Number);
    return n[0] * 3600 + n[1] * 60 + n[2];
  }

  function getLeaderboard(data) {
    const leaderboard = {};

    data.players.forEach(p => {
      leaderboard[p.id] = {
        Player: p.id,
        G: 0,
        W: 0,
        L: 0,
        D: 0,
        P: 0,
        S: 0,
        Ln: 0,
        T: "2:00:00",
        WR: "0%",
        Victims: []
      };
    });
  
    data.games.forEach(gw => {
      gw.matches.forEach(match => {
        const { player1, player2,  player1Score, player2Score, bingo, bingoWinner, time } = match;

        if (player1Score === null || player2Score === null) return; 
  
        leaderboard[player1].G++;
        leaderboard[player2].G++;
  
        leaderboard[player1].S += player1Score;
        leaderboard[player2].S += player2Score;

        let winner;
        let loser;

        const addWindLose = (winner, loser) => {
          leaderboard[loser].L++;
          leaderboard[winner].W++;
          leaderboard[winner].P += 3;
          leaderboard[winner].Victims.push(loser);
          if (time && convertTime(time) < convertTime(leaderboard[winner].T)) {
            leaderboard[winner].T = time
          }
        }
        
        if (bingo) {
          winner = bingoWinner;
          loser = bingoWinner === player1 ? player2 : player1;
          leaderboard[bingoWinner].Ln++;
          addWindLose(winner,loser);
        } else if (player1Score === player2Score) {
          leaderboard[player1].P +=1;
          leaderboard[player2].P +=1;
          leaderboard[player1].D +=1;
          leaderboard[player2].D +=1;
        } else {
          winner = player1Score > player2Score 
          ? player1 
          : player1Score < player2Score 
          ? player2 : null;
         
          loser = player1Score > player2Score 
          ? player2 
          : player1Score < player2Score 
          ? player1 : null;
          addWindLose(winner,loser);
        }
      });
    });
  
    Object.values(leaderboard).forEach(p => {
      p.WR = p.G > 0 ? Math.round((p.W / p.G) * 100) + "%" : "0%";
    });
  
    return Object.values(leaderboard).sort((a, b) => {
      const first = b.P - a.P; 
      if (first !== 0) return first;

      if (a.Victims.includes(b.id)) return -1;
      if (b.Victims.includes(a.id)) return 1;

      const third = b.Ln - a.Ln;
      if (third) return third;

      return b.T - a.T;
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
  
  function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
  
    return [hours, minutes, seconds]
      .map(v => String(v).padStart(2, "0"))
      .join(":");
  }

  window.bingoFunctions = {
    getLeaderboard,
    getAllMatches,
    formatTime
  }
})()
  