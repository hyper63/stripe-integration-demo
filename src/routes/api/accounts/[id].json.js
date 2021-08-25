export async function get({ params }) {

  const res = await fetch(`http://localhost:6363/data/stripe/${params.id}`)
  if (res.ok) {
    const account = await res.json()

    return {
      body: account
    }
  }
  return {
    status: 404,
    body: {
      ok: false,
      msg: 'Not Found'
    }
  }
}