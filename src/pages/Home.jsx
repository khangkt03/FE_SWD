import Partners from '../components/Partners';

const Home = () => {
  return (
    <>
      <Navbar />
      {/* ... existing home content ... */}
      
      {/* Thêm phần Partners vào trước Footer */}
      <Partners />
      
      <Footer />
    </>
  );
}; 