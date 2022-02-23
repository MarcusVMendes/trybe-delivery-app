// MIDDLEWARE DE ERRO PADRÃO - TODOS OS ERROS ENTRARÃO AQUI

const {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MSG,
  BAD_REQUEST,
} = require('../utils/dictionary');

module.exports = (err, _req, res, _next) => {
  // PARA ERROS DO JOI
  if (err.isJoi) {
    return res.status(BAD_REQUEST).json({ message: err.details[0].message });
  }

  // ERRO DESCONHECIDO
  if ((err.code === 500) || (err.code === undefined)) {
    console.log(err);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MSG });
  }
  
  // PARA ERROS PROVENIENTES DE 'THROW's'
  return res.status(err.code).json({ message: err.message });
};