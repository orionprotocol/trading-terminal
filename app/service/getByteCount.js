// Usage:
// getByteCount({'MULTISIG-P2SH:2-4':45},{'P2PKH':1}) Means "45 inputs of P2SH Multisig and 1 output of P2PKH"
// getByteCount({'P2PKH':1,'MULTISIG-P2SH:2-3':2},{'P2PKH':2}) means "1 P2PKH input and 2 Multisig P2SH (2 of 3) inputs along with 2 P2PKH outputs"
module.exports = function getByteCount (inputs, outputs) {
  var totalWeight = 0
  var hasWitness = false
  var inputCount = 0
  var outputCount = 0
  // assumes compressed pubkeys in all cases.
  var types = {
    'inputs': {
      'MULTISIG-P2SH': 49 * 4,
      'MULTISIG-P2WSH': 6 + (41 * 4),
      'MULTISIG-P2SH-P2WSH': 6 + (76 * 4),
      'P2PKH': 148 * 4,
      'P2WPKH': 108 + (41 * 4),
      'P2SH-P2WPKH': 108 + (64 * 4)
    },
    'outputs': {
      'P2SH': 32 * 4,
      'P2PKH': 34 * 4,
      'P2WPKH': 31 * 4,
      'P2WSH': 43 * 4
    }
  }

  function checkUInt53 (n) {
    if (n < 0 || n > Number.MAX_SAFE_INTEGER || n % 1 !== 0) throw new RangeError('value out of range')
  }

  function varIntLength (number) {
    checkUInt53(number)

    return (
      number < 0xfd ? 1
        : number <= 0xffff ? 3
        : number <= 0xffffffff ? 5
          : 9
    )
  }

  Object.keys(inputs).forEach(function(key) {
    checkUInt53(inputs[key])
    if (key.slice(0,8) === 'MULTISIG') {
      // ex. "MULTISIG-P2SH:2-3" would mean 2 of 3 P2SH MULTISIG
      var keyParts = key.split(':')
      if (keyParts.length !== 2) throw new Error('invalid input: ' + key)
      var newKey = keyParts[0]
      var mAndN = keyParts[1].split('-').map(function (item) { return parseInt(item) })

      totalWeight += types.inputs[newKey] * inputs[key]
      var multiplyer = (newKey === 'MULTISIG-P2SH') ? 4 : 1
      totalWeight += ((73 * mAndN[0]) + (34 * mAndN[1])) * multiplyer * inputs[key]
    } else {
      totalWeight += types.inputs[key] * inputs[key]
    }
    inputCount += inputs[key]
    if (key.indexOf('W') >= 0) hasWitness = true
  })

  Object.keys(outputs).forEach(function(key) {
    checkUInt53(outputs[key])
    totalWeight += types.outputs[key] * outputs[key]
    outputCount += outputs[key]
  })

  if (hasWitness) totalWeight += 2

  totalWeight += 8 * 4
  totalWeight += varIntLength(inputCount) * 4
  totalWeight += varIntLength(outputCount) * 4

  return Math.ceil(totalWeight / 4)
}
