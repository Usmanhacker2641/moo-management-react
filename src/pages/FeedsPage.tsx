
import DashboardHeader from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeedsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Feed Formulation" />
      
      <div className="container p-4 flex-1">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <p className="text-gray-500 mb-4">
            These are standard formulas meant for information purpose.
          </p>
          
          <Tabs defaultValue="high-yielding">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="high-yielding" className="flex-1">High Yielding</TabsTrigger>
              <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
              <TabsTrigger value="ordinary" className="flex-1">Ordinary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="high-yielding">
              <Card>
                <CardHeader>
                  <CardTitle>High Yielder Dairy Supplement</CardTitle>
                  <CardDescription>Making 100kg of high-yielding dairy supplement</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Maize germ 50kg</li>
                    <li>Wheat pollard 16kg</li>
                    <li>Molasses 2L</li>
                    <li>Cotton seedcake 14kg</li>
                    <li>Lucern hay 12kg</li>
                    <li>Fishmeal 4kg</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Dairy Meal</CardTitle>
                  <CardDescription>Making advanced dairy meal 70kg</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    Dairy meal is mixed so that the final feed has a relatively high protein content of 16%. 
                    Protein should not exceed 30% of the total dry matter.
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Maize germ 10kg</li>
                    <li>Wheat pollard 23kg</li>
                    <li>Wheat bran 18kg</li>
                    <li>Cotton seed cake 2kg</li>
                    <li>Livestock lime 3kg</li>
                    <li>Salt 300g</li>
                    <li>Sunflower seed cake 12kg</li>
                    <li>Dairy premix 100g</li>
                    <li>DCP 100g</li>
                    <li>Yeast 2kg</li>
                    <li>Molasses 3L</li>
                    <li>Adolac by-pass fat 1kg</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ordinary">
              <Card>
                <CardHeader>
                  <CardTitle>Ordinary Dairy Cattle Supplement</CardTitle>
                  <CardDescription>Making 100kg of ordinary dairy cattle supplement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    Ordinary feed is mixed so that the final feed has a relatively balanced ration. 
                    Protein content should not exceed 30% of the total dry matter.
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Maize germ 57kg</li>
                    <li>Wheat pollard 18kg</li>
                    <li>Lucern hay 17kg</li>
                    <li>Fish/Soya meal</li>
                    <li>DCP 2kg</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FeedsPage;
