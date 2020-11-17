const instanceAxios = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 1000,
});

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
        };
    },
    async mounted() {
        this.getContatos();
    },
    methods: {
        async getContatos() {
            this.carregando = true;
            this.contatos = [];

            const { data } = await instanceAxios.get(
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
        async cadastrarNovo() {
            const { data } = await instanceAxios.post("contatos/", {
                nome: this.novoNome,
                telefone: this.novoTelefone,
            });

            this.novaNotificacao("Criado com sucesso!", "success");
            this.novoNome = "";
            this.novoTelefone = "";
            this.showDialog = false;
            this.letraSelecionada = null;
            this.getContatos();
        },
        novaNotificacao(message, type = "info") {
            Vue.$toast.open({ postion: "top-right", type, message });
        },
        async salvarEdicao(index) {
            const { data } = await instanceAxios.put(
                "contatos/" + this.contatos[this.editandoKey].id,
                this.contatos[index]
            );

            this.novaNotificacao("Editado com sucesso!", "success");
            this.editandoKey = null;
            this.backup = null;
        },
        editar(key) {
            if (this.editandoKey != null)
                this.contatos[this.editandoKey] = this.backup;
            this.editandoKey = key;
            this.backup = Object.assign({}, this.contatos[key]);
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
                const { data } = await instanceAxios.get(
                    "contatos/search/" + this.search
                );
                this.contatos = data;
                this.carregando = false;
            }
        },
    },
});
instanceAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        const { data } = error.response;

        app.novaNotificacao(data.error + ": " + data.message, "error");
        throw error;
    }
);