const pabellones = ["Arrupe", "Areilza", "Aztarain", "Guturbai"];
const servicios = [];

class Servicio {
    constructor(servicio, pabellon, mostrar) {
        this._servicio = servicio;
        this._pabellon = pabellon;
        this._mostrar = mostrar;
    }

    // Getters
    get servicio() {
        return this._servicio;
    }

    get pabellon() {
        return this._pabellon;
    }

    get mostrar() {
        return this._mostrar;
    }

    // Setters
    set servicio(servicio) {
        this._servicio = servicio;
    }

    set pabellon(pabellon) {
        this._pabellon = pabellon;
    }

    set mostrar(mostrar) {
        this._mostrar = mostrar;
    }

    // Método mostrar
    mostrarInfo() {
        const indicePabellon = pabellones.indexOf(this._pabellon) + 1;
        const visibilidad = this._mostrar ? 'Visible' : 'No visible';
        return `${this._servicio} - ${indicePabellon}: ${this._pabellon} - ${visibilidad}.`;
    }
}