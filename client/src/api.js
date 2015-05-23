export function checkPriveleges(acc) {
  return new Promise((resolve, reject) => {
    var result      = {}
    if (acc) result = acc
    result.access   = true
    result.admin    = false
    return resolve(result)
  })
}
