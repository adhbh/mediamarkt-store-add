const getParcels = async () => {
  return ParcelsData;
};

const getParcelsById = async (parcelId: string) => {
  return ParcelsData.find((item) => item.id.$oid === parcelId);
};
