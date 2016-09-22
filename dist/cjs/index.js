"use strict";
var game_board_1 = require('./game-board');
function Conway() {
    this.board = new game_board_1.default();
    var lifeform = document.querySelector('#lifeform').value;
    document.querySelector('button').removeAttribute('disabled');
    document.querySelector('#lifeform-character').innerHTML = lifeform;
    this.board.setState({
        M: parseInt(document.querySelector('#m').value, 10),
        N: parseInt(document.querySelector('#n').value, 10),
        lifeform: lifeform,
        liveCells: []
    });
}
Conway.prototype = {
    start: function () {
        document.querySelector('button').disabled = true;
        this.next();
    },
    next: function () {
        var _this = this;
        var _a = this.board, M = _a.M, N = _a.N, liveCells = _a.liveCells;
        $.ajax({
            url: 'http://localhost:3000/api/conway/generation',
            jsonp: 'callback',
            dataType: 'jsonp',
            data: { M: M, N: N, liveCells: liveCells },
            success: function (response) {
                _this.board.setState(response);
                if (_this.board.liveCells.length > 0) {
                    setTimeout(function () { return _this.next(); }, 100);
                }
                else {
                    document.querySelector('button').removeAttribute('disabled');
                }
            }
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Conway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXNCLGNBQWMsQ0FBQyxDQUFBO0FBRXJDO0lBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLG9CQUFTLEVBQUUsQ0FBQztJQUM3QixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN6RCxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3RCxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUNuRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNsQixDQUFDLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUNuRCxDQUFDLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUNuRCxVQUFBLFFBQVE7UUFDUixTQUFTLEVBQUUsRUFBRTtLQUNkLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsU0FBUyxHQUFHO0lBQ2pCLEtBQUs7UUFDSCxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUk7UUFBSixpQkFpQkM7UUFoQkMsSUFBQSxlQUFvQyxFQUE5QixRQUFDLEVBQUUsUUFBQyxFQUFFLHdCQUFTLENBQWdCO1FBRXJDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDTCxHQUFHLEVBQUUsNkNBQTZDO1lBQ2xELEtBQUssRUFBRSxVQUFVO1lBQ2pCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLElBQUksRUFBRSxFQUFFLEdBQUEsQ0FBQyxFQUFFLEdBQUEsQ0FBQyxFQUFFLFdBQUEsU0FBUyxFQUFFO1lBQ3pCLE9BQU8sRUFBRSxVQUFDLFFBQVE7Z0JBQ2hCLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxFQUFFLEVBQVgsQ0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDO0FBRUY7a0JBQWUsTUFBTSxDQUFDIn0=