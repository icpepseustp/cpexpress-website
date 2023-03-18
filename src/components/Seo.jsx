import { string } from "prop-types"
import { Helmet } from "react-helmet"

function Seo({ lang = "en-US", title }) {
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      defaultTitle={title}
    />
  )
}

Seo.propTypes = {
  lang: string,
  title: string.isRequired,
}

export default Seo