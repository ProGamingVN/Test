#include "crow_all.h"  // tải từ https://github.com/CrowCpp/crow/releases

int main()
{
    crow::SimpleApp app;

    CROW_ROUTE(app, "/tong")
    ([](const crow::request& req){
        auto a_str = req.url_params.get("a");
        auto b_str = req.url_params.get("b");

        if (!a_str || !b_str)
            return crow::response(400, "Thiếu tham số");

        double a = std::stod(a_str);
        double b = std::stod(b_str);
        double tong = a + b;

        return crow::response(std::to_string(tong));
    });

    app.port(18080).multithreaded().run();
}
