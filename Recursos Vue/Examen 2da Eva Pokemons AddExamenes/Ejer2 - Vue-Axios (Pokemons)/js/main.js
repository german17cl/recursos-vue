
const vm ={
    mounted() {
        this.cargarPokemons();  
    },

    data() {
        return{
            pokemons: [],
            nombrePokemon:'',
            tipoPokemon:'',
            habilidadPokemon:'',
            selTipo:''
        }
    },

    methods: {
        cargarPokemons() {
            axios.get('./js/pokemons.json')
                .then((respuesta) => {
                    console.log(respuesta);
                    this.pokemons = respuesta.data.results; //la respuesta con vue-resource venia en body, AHORA VIENE EN data
                });
        },
        agregarPokemon(){
            this.pokemons.push({name:this.nombrePokemon, type: this.tipoPokemon, ability:this.habilidadPokemon})
        },
        borrarPokemon(pokemon){
            let indice=this.pokemons.indexOf(pokemon);
            alert (indice);
            if (indice >= 0) {
                this.pokemons.splice(indice, 1);
              }
        },   
    },

     computed: {
        tiposPokemon() {
            let tipos=[];
            this.pokemons.forEach(element => {
                tipos.push(element.type);
            });
            return [... new Set(tipos)];
        },    
        pokemons2() {
           
            return this.pokemons.filter((pokemon) => pokemon.type ==this.selTipo);
        }
    }     
};
Vue.createApp(vm).mount('main')