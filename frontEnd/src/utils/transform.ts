export const objectToFormData = (data: any) => {
  const form = new FormData()
  for (let keys in data) {
    const key = keys == 'images' ? 'images[]' : keys
    Array.isArray(data[keys])
      ? data[keys].forEach((value:any) => {
          form.append(key, value)
        })
      : form.append(key, data[keys])
  }
  return form
}
