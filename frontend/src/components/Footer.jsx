import React from 'react';

const Footer = () => {
  return (
    <div class="font-fontInter w-full mx-auto bg-none place-self-end">
      <footer class=" shadow md:px-6 md:py-6 ">
        <hr class="my-6 border-gray-200 sm:mx-auto" />
        <span class="block text-sm text-gray-600 sm:text-center ">
          © 2023{' '}
          <i>
            <b>allone.</b>
          </i>{' '}
          . All Rights Reserved.
        </span>
      </footer>
    </div>
  );
};

export default Footer;
