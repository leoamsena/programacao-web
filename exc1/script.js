var app = new Vue({
    el: "#app",
    methods: {
        excluir: function(linha) {
            this.table = this.table.filter((item) => item != linha);
        },
        markEdit: function(linha) {
            this.editar = linha;
            this.inpCompeticao = linha.competicao;
            this.inpTemporadas = linha.temporadas;
            this.inpTitulos = linha.titulos;
        },
        markNew: function() {
            this.editar = null;
            this.inpCompeticao = "";
            this.inpTemporadas = "";
            this.inpTitulos = "";
        },
        submit: function() {
            if (this.editar == null) {
                this.table.push({
                    competicao: this.inpCompeticao,
                    titulos: this.inpTitulos,
                    temporadas: this.inpTemporadas,
                });
            } else {
                this.editar.competicao = this.inpCompeticao;
                this.editar.titulos = this.inpTitulos;
                this.editar.temporadas = this.inpTemporadas;
            }
            $("#createEditModal").modal("hide");
        },
    },
    data: {
        editar: null,
        inpCompeticao: "",
        inpTitulos: "",
        inpTemporadas: "",

        table: [
            { competicao: "Tríplice Coroa", titulos: 1, temporadas: "2003" },
            {
                competicao: "Copa Libertadores da América",
                titulos: 2,
                temporadas: "1976 e 1997",
            },
            {
                competicao: "Supercopa Sul-Americana",
                titulos: 2,
                temporadas: "1991 e 1992",
            },
        ],
    },
});