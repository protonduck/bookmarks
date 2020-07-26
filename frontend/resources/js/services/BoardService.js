import Vue from 'vue';
import axios from "axios";
import _ from "lodash";

export default new Vue({
    data: {
        boards: [],
        activeBoardId: null,
    },
    methods: {
        fetchBoards() {
            this.$http.get('/boards').then(resp => {
                this.setBoards(resp.data);
            }).catch(err => {
                console.log(err);
            });
        },
        setBoards(boards) {

            this.boards = boards;
            
            if (!this.activeBoardId && boards.length) {
                this.activeBoardId = boards[0]['id'];
            }

            this.$emit('boardsChanged');

        },
        getActiveBoard() {
            return _.find(this.boards, {id: this.activeBoardId});
        }
    },
});