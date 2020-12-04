Vue.use(VueMaterial.default);
Vue.use(VueToast);
Vue.directive("mask", VueMask.VueMaskDirective);
const app = new Vue({
    el: "#app",
    data() {
        return {
            contatos: [],
            backup: null,
            editandoKey: null,
            carregando: true,
            letraSelecionada: null,
            search: "",
            novoNome: "",
            novoTelefone: "",
            showLetras: false,
            showDialog: false,
            showDialogDelete: false,
            excluirId: null,
            cep: "",
            cepValido: false,
            logradouro: null,
            cidade: null,
            numero: null,
            estado: null,
            bairro: null,
            instanceAxios: axios.create({
                baseURL: "http://192.168.1.8:8080/",
                //timeout: 100000,
            }),
        };
    },
    async mounted() {
        this.instanceAxios.interceptors.response.use(
            (response) => response,
            (error) => {
                const {
                    response = {
                        data: {
                            error: "Erro",
                            message: error.message,
                        },
                    },
                } = error;

                const { data } = response;

                this.novaNotificacao(data.error + ": " + data.message, "error");
                throw error;
            }
        );

        this.getContatos();
    },
    methods: {
        dialogClosed() {
            if (this.editandoKey != null && this.contatos.length > 0) {
                this.contatos[this.editandoKey] = this.backup;
                this.editandoKey = null;
            }
            this.refreshInputs();
        },
        async getCep(cep) {
            const { data } = await this.instanceAxios.get(
                "https://viacep.com.br/ws/" + cep + "/json"
            );

            if (data.erro) {
                // deu erro
                this.novaNotificacao("CEP incorreto!", "error");
            } else {
                //deu certo
                const { bairro, localidade, logradouro, uf } = data;
                this.bairro = bairro;
                this.cidade = localidade;
                this.logradouro = logradouro;
                this.estado = uf;
                this.novaNotificacao("Endereço preenchido!");
                this.cepValido = true;
            }
        },
        async confirmarExclusao() {
            this.showDialogDelete = false;
            await this.instanceAxios.delete("contatos/" + this.excluirId);
            this.novaNotificacao("Contato excluido com sucesso!");
            this.getContatos();
        },
        async getContatos() {
            this.carregando = true;
            this.contatos = [];

            const { data } = await this.instanceAxios.get(
                "contatos/" +
                (this.letraSelecionada ? "byletter/" + this.letraSelecionada : "")
            );

            this.contatos = data;
            this.carregando = false;
        },
        selecionaLetra(letra) {
            this.letraSelecionada = letra;
            this.showLetras = false;
            this.getContatos();
        },
        refreshInputs() {
            this.novoNome = "";
            this.novoTelefone = "";
            this.cep = "";
            this.numero = "";
            this.logradouro = "";
            this.bairro = "";
            this.cidade = "";
        },
        mountObject() {
            return {
                nome: this.novoNome,
                telefone: this.novoTelefone,
                cep: (this.cep + "").replace(/\.|-/g, ""),
                numero: this.numero,
                bairro: this.bairro,
                logradouro: this.logradouro,
                cidade: this.cidade,
                estado: this.estado,
            };
        },
        async cadastrarNovo() {
            const { data } = await this.instanceAxios.post(
                "contatos/",
                this.mountObject()
            );

            this.novaNotificacao("Criado com sucesso!", "success");
            this.refreshInputs();
            this.showDialog = false;
            this.letraSelecionada = null;
            this.getContatos();
        },
        excluir(key) {
            this.showDialogDelete = true;
            this.excluirId = this.contatos[key].id;
        },
        novaNotificacao(message, type = "info") {
            Vue.$toast.open({ postion: "top-right", type, message });
        },
        async salvarEdicao(index) {
            const { cep, ...resto } = this.mountObject();

            const aux = Object.assign({}, { cep: (cep + "").replace(/\.|-/g, "") },
                resto
            );
            const { data } = await this.instanceAxios.put(
                "contatos/" + this.contatos[this.editandoKey].id,
                aux
            );

            this.novaNotificacao("Editado com sucesso!", "success");
            this.getContatos();
            this.editandoKey = null;
            this.showDialog = false;
            this.backup = null;
        },
        editar(key) {
            this.editandoKey = key;
            this.backup = Object.assign({}, this.contatos[key]);
            this.novoNome = this.contatos[key].nome;
            this.novoTelefone = this.contatos[key].telefone;
            this.cep = this.contatos[key].cep + "";
            console.log(this.cep);
            this.numero = this.contatos[key].numero;
            this.showDialog = true;
        },
    },
    computed: {
        listaAlfabetica() {
            let arr = [];
            for (let i = 65; i <= 90; i++) arr.push(String.fromCharCode(i));
            return arr;
        },
    },
    watch: {
        async search() {
            if (this.search == "") {
                // se nada escrito na pesquisa, retornar por pesquisa de letra normal
                this.getContatos();
            } else {
                // se deseja pesquisar...
                this.carregando = true;
                this.contatos = [];
                const { data } = await this.instanceAxios.get(
                    "contatos/search/" + this.search
                );
                this.contatos = data;
                this.carregando = false;
            }
        },
        cep() {
            console.log(this.cep);
            const cep = (this.cep + "").replace(/\.|-/g, "");
            console.log(this.cep);
            this.cepValido = false;
            if (cep.length == 8) {
                this.getCep(cep);
            }
        },
    },
});