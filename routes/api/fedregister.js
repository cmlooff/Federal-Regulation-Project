const express = require('express');
const router = express.Router();
const axios = require('axios').default;

/**
 * @Route   get api/fed
 * @desc    Get all Federal Register Documents since 1994
 * @access  Public
 *
 * https://www.federalregister.gov/api/v1/documents.json?per_page=20
 */
router.get('/', async (req, res) => {
  try {
    const federalDocumentsData = await axios.get(
      'https://www.federalregister.gov/api/v1/documents/2012-19763.json?fields[]=full_text_xml_url'
    );
    // console.log(federalDocumentsData);

    return res.json({
      success: true,
      data: federalDocumentsData.data
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at Federal Register');
  }
});

module.exports = router;
