export const getForm = async () => {
  const FORM_URL = 'https://c4t8tobheh.execute-api.us-east-1.amazonaws.com/production/forms'
  const forms = await fetch(FORM_URL).then(res => res.json())
  return forms._embedded
}
