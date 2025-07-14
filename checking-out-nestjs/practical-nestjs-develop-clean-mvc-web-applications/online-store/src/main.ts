import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as hbs from "hbs";
import * as hbsUtils from "hbs-utils";

async function bootstrap() {
	hbs.registerPartials(join(__dirname, "..", "views", "layouts"));
	hbsUtils.registerWatchedPartials(join(__dirname, "..", "views", "layouts"));

	const app = (await NestFactory.create<NestExpressApplication>(AppModule))
		.useStaticAssets(join(__dirname, "..", "public"))
		.setBaseViewsDir(join(__dirname, "..", "views"))
		.setViewEngine("hbs");

	await app.listen(3000);
}
bootstrap();
