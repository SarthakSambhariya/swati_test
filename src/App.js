import Home from "./layouts/Home";
import FindProfessionals from "./layouts/FindProfessional";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import ExploreProjects from "./layouts/ExploreProjects";
import Brands from "./layouts/Brands";
import Magazines from "./layouts/Magazines";
import Idesignexclusive from "./layouts/Idesignexclusive";
import LikedInspriation from "./layouts/LikedInspriation";
import DesignerProfile from "./layouts/DesignerProfile";
import BrandsDetails from "./layouts/BrandsDetails";
import Blogs from "./layouts/Blogs";
import ExploreProjectDetais from "./layouts/ExploreProjectDetais";
import BoqComparison from "./layouts/BoqComparison";
import Connect from "./layouts/Connect";
import FinalBilling from "./layouts/FinalBilling";
import FinalBillingDetails from "./layouts/FinalBillingDetails";
import FinalBillingLoan from "./layouts/FinalBillingLoan";
import HelpDesk from "./layouts/HelpDesk";
import Privacy from "./layouts/Privacy";
import QuoteComparison from "./layouts/QuoteComparison";
import Quotecong from "./layouts/Quotecong";
import Quotedetails from "./layouts/Quotedetails";
import Schedule from "./layouts/Schedule";
import Terms from "./layouts/Terms";
import Csr from "./layouts/Csr";
import Dashboard from "./layouts/Dashboard/index";
import Projects from "./layouts/Dashboard/projects";
import Designers from "./layouts/Dashboard/designers";
import Photo from "./layouts/Dashboard/photo";
import DashboardMagazines from "./layouts/Dashboard/magazines";
import Dbrands from "./layouts/Dashboard/dbrands";
import Help from "./layouts/Dashboard/help";
import Loan from "./layouts/Loan";
import "./App.css";
import Logout from "./components/logout";
import OEMListingPage from "./components/findprofessional/OEMListingPage";
// import ProtectedRoute from "./components/protectedRoute";/
import { isMobile } from "react-device-detect";
import "react-toastify/dist/ReactToastify.css";
import FindProfessionals2 from "../src/layouts/FindProfessionals2";
import DesignerProfile2 from "./layouts/DesignerProfile2";
function App() {
  return (
    <Switch>
      <Route
        path="/findprofessionals"
        render={(props) => (
          <FindProfessionals {...props} mobileview={isMobile} />
        )}
      />
      <Route
        path="/findprofessionals/contractor"
        render={(props) => (
          <FindProfessionals {...props} mobileview={isMobile} />
        )}
      />
      <Route
        path="/findprofessionals2/contractor2"
        render={(props) => (
          <FindProfessionals2 {...props} mobileview={isMobile} />
        )}
      />
      <Route exact path="/oemlistingpage" component={OEMListingPage} />
      <Route exact path="/findprofessionals2" component={FindProfessionals2} />

      <Route
        path="/findprofessionals/contractor"
        render={(props) => (
          <FindProfessionals {...props} mobileview={isMobile} />
        )}
      />
      <Route
        path="/findprofessionals/oem"
        render={(props) => (
          <FindProfessionals {...props} mobileview={isMobile} />
        )}
      />

      <Route exact path="/exploreprojects" component={ExploreProjects} />
      <Route exact path="/magazines" component={Magazines} />
      <Route exact path="/idesignexclusive" component={Idesignexclusive} />
      <Route
        exact
        path="/projects/:city/:name"
        component={ExploreProjectDetais}
      />
      {/* <Route exact path="/brand/:city/:company" component={BrandsDetails} /> */}
      <Route exact path="/brand/:id/" component={BrandsDetails} />
      <Route exact path="/brands" component={Brands} />
      <Route exact path="/magazine/:category/:title" component={Blogs} />

      {/* <Route exact path="/:name/:city/:company" component={DesignerProfile} /> */}
      <Route exact path="/:name/:city/:company" component={DesignerProfile2} />
      <Route exact path="/boqbomparison" component={BoqComparison} />
      <Route exact path="/connect" component={Connect} />
      <Route exact path="/finalbilling" component={FinalBilling} />
      <Route
        exact
        path="/finalbillingdetails"
        component={FinalBillingDetails}
      />
      <Route exact path="/finalbillingloan" component={FinalBillingLoan} />
      <Route exact path="/helpdesk" component={HelpDesk} />
      <Route exact path="/privacy" component={Privacy} />

      <Route exact path="/quotecomparison" component={QuoteComparison} />

      <Route exact path="/quotecong" component={Quotecong} />
      <Route exact path="/quotedetails" component={Quotedetails} />
      <Route exact path="/schedule" component={Schedule} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/loan" component={Loan} />
      <Route exact path="/csr" component={Csr} />

      <Route exact path="/logout" component={Logout} />

      <Route exact path="/dashboard/home" component={Dashboard} />
      <Route exact path="/dashboard/projects" component={Projects} />
      <Route exact path="/dashboard/designers" component={Designers} />
      <Route exact path="/dashboard/photos" component={Photo} />
      <Route exact path="/dashboard/magazines" component={DashboardMagazines} />
      <Route exact path="/dashboard/brands" component={Dbrands} />
      {/* <Route path="/dashboard/help" component={Help} /> */}

      <Route
        path="/"
        render={(props) => <Home {...props} mobileview={isMobile} />}
      />
    </Switch>
  );
}

export default App;
