export function getDataFormatada(data) {
  return data.toLocaleDateString('pt-BR');
}

export function getDataMinusDias(data, dias) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() - dias);
}