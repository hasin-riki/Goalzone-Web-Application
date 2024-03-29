const Country=require('../../models/countryModel');
const paginationParams = require('../../utils/helpers/paginationParams');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const addCountry = controllerWrapper(
    async (req, res) => {
        req.body.countryId=req.body.countryId || (req.body.countryName[0]+req.body.countryName[1]+req.body.countryName[2]).toLowerCase();
        req.body.status=req.body.status || 'Inactive';
        const country=await Country.create(req.body);

        res.status(200).json({message: "Country successfully added!", country});
    }, 
    "Country could not be added."
)

const getAllCountries = controllerWrapper(
    async (req, res) => {
        const { page, limit, skip } = paginationParams(req.query);

        const countries = await Country.find().sort({createdAt: -1}).skip(skip).limit(limit).populate('cities');

        const totalCountries = await Country.countDocuments();
        const totalPages = Math.ceil(totalCountries/limit);

        res.status(200).json({page, totalCountries, totalPages, countries});
    }, 
    "Unable to get countries."
)

const getCountry = controllerWrapper(
    async (req, res) => {
        const country = req.country;
        res.status(200).json(country);
    }, 
    "Unable to get country."
)

const updateCountry = controllerWrapper(
    async (req, res) => {
        const country=req.country;

        for (const field in req.body) {
            switch (field) {
                case 'countryId':
                    country.countryId = req.body.countryId;
                    break;
                case 'countryName':
                    country.countryName = req.body.countryName;
                    break;
                case 'image':
                    country.image = req.body.image;
                    break;
                case 'status':
                    country.status = req.body.status;
                    break;
            }
        }

        const updatedCountry=await country.save();
        res.status(200).json({message: "Country successfully updated!", updatedCountry});
    }, 
    "Country could not be updated."
)

const deleteCountry = controllerWrapper(
    async (req, res) => {
        const country = await Contact.findOneAndDelete({countryId: req.params.countryId});
        if(!country) {
            return res.status(404).json({ message: "This country does not exist."});
        }

        res.status(200).json({message: "Country successfully deleted!", country});
    }, 
    "Country could not be deleted."
)

module.exports={addCountry, getAllCountries, getCountry, updateCountry, deleteCountry};