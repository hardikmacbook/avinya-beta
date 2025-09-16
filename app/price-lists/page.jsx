import React from 'react';
import PriceList from '@/componets/PriceList/PriceList';

const PriceListPage = () => {
  return (
    <>
      <div className="pt-24"> {/* Add padding to account for fixed navbar */}
        <PriceList />
      </div>
    </>
  );
};

export default PriceListPage;