const asyncHandler = require('express-async-handler');
const si = require('systeminformation');

//@desc Visualizzazione se funziona
//@route GET /api/health/
//@access private
const serverInfoHW = asyncHandler(async (req, res) => {
    // Informazioni di base sul sistema
    let response = {}
    await si.system()
        .then(data => response.system = data)
        .catch(error => console.error(error));

    // Informazioni sulla CPU
    await si.cpu()
        .then(data => response.cpu = data)
        .catch(error => console.error(error));

    // Informazioni sulla memoria
    await si.mem()
        .then(data => response.memoria = data)
        .catch(error => console.error(error));

    // Informazioni sulla temperatura della CPU
    await si.cpuTemperature()
        .then(data => response.cpu_temp = data)
        .catch(error => console.error(error));

    // Informazioni sul carico del sistema
    await si.currentLoad()
        .then(data => response.carico_attuale = data)
        .catch(error => console.error(error));

    res.status(200).send(response);
});


module.exports = { serverInfoHW }