package com.example.demo.camel.route;

import java.io.InputStream;

import com.example.demo.camel.processor.CalendarProcessor;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import com.example.demo.camel.processor.LoginProcessor;
import com.example.demo.camel.processor.RegistryProcessor;
import com.example.demo.utils.CamelProcessorUtils;

@Component
@PropertySource({"classpath:config/mule.properties"})
public class CamelRoute extends RouteBuilder {
	
	@Value("${user.login.url}")
	private String loginUrl;
	
	@Value("${user.registry.url}")
	private String registryUrl;
	
	@Value("${username.check.url}")
	private String usernameCheckUrl;
	
	@Value("${applications.overview.url}")
	private String appsOverviewUrl;

	@Value("${getCalenderTitle.url}")
	private String getCalenderTitleUrl;

	@Value("${daySchedule.time.url}")
	private String dayScheduleUrl;

	@Value("${getGrade.url}")
	private String getGradeUrl;

	@Value("${calendarSchduleUrl.time.url}")
	private String calendarSchduleUrl;

	@Value("${getStaffListUrl.url}")
	private String getStaffListUrl;

	@Value("${getAllBranchUrl.url}")
	private String getAllBranchUrl;

	@Value("${calender.day.branch.staff.url}")
	private String dayBranchStaffInfoUrl;

	@Value("${dragAndDrop.url}")
	private String dragAndDropUrl;


	@Value("${calender.save.branch.url}")
	private String saveBranchCalendarUrl;

	@Value("${calender.distribute.task.url}")
	private String getDistributeTaskListUrl;

	@Value("${calender.update.distribute.url}")
	private String updateDistributeTaskUrl;

	@Value("${everyDayCount.url}")
	private String everyDayCountUrl;

	@Value("${deleteSchdule.url}")
	private String deleteSchduleUrl;

	@Value("${saveTaskQuantity.url}")
	private String saveTaskQuantityUrl;

	@Value("${seePersonalNumber.url}")
	private String seePersonalNumberUrl;

	@Value("${calendar.edit.branch.url}")
	private String editBranchInfoUrl;

	@Value("${calendar.get.branch.url}")
	private String getBranchInfoUrl;

	@Value("${calendar.del.branch.url}")
	private String delBranchInfoUrl;


	@Override
	public void configure() throws Exception {
		restConfiguration()
		  .contextPath("/camel") 
		  .port("8080")
		  .enableCORS(true)
		  .apiContextPath("/api-doc")
		  .apiProperty("api.title", "Camel REST API")
		  .apiProperty("api.version", "v1")
		  .apiContextRouteId("doc-api")
		  .component("servlet");

		rest("/api/")
				.id("seePersonalNumber-route")
				.consumes("application/json")
				.post("/seePersonalNumber")
				.to("direct:seePersonalNumberService");
		from("direct:seePersonalNumberService").process(new CalendarProcessor()).to(seePersonalNumberUrl);

		rest("/api/")
				.id("everyDayCount-route")
				.consumes("application/json")
				.post("/everyDayCount")
				.to("direct:everyDayCountService");
		from("direct:everyDayCountService").process(new CalendarProcessor()).to(everyDayCountUrl);

		rest("/api/")
				.id("saveTaskQuantity-route")
				.consumes("application/json")
				.post("/saveTaskQuantity")
				.to("direct:saveTaskQuantityService");
		from("direct:saveTaskQuantityService").process(new CalendarProcessor()).to(saveTaskQuantityUrl);

		rest("/api/")
				.id("deleteSchdule-route")
				.consumes("application/json")
				.post("/deleteSchdule")
				.to("direct:deleteSchduleService");
		from("direct:deleteSchduleService").process(new CalendarProcessor()).to(deleteSchduleUrl);

		rest("/api/")
		  .id("login-route")
		  .consumes("application/json")
		  .post("/login")
		  .to("direct:loginService");
		from("direct:loginService").process(new LoginProcessor()).to(loginUrl);

		rest("/api/")
				.id("login-route")
				.consumes("application/json")
				.post("/dragAndDrop")
				.to("direct:dragAndDropService");
		from("direct:dragAndDropService").process(new CalendarProcessor()).to(dragAndDropUrl);
		
		rest("/api/")
		  .id("registry-route")
		  .consumes("application/json")
		  .post("/registry")
		  .to("direct:registryService");
		from("direct:registryService").process(new RegistryProcessor()).to(registryUrl);

		rest("/api/")
				.id("calendarTime-route")
				.consumes("application/json")
				.post("/getCalenderTitle")
				.to("direct:getCalenderTitleService");
		from("direct:getCalenderTitleService").process(new CalendarProcessor()).to(getCalenderTitleUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/getDaySchedule")
				.to("direct:dayScheduleService");
		from("direct:dayScheduleService").process(new CalendarProcessor()).to(dayScheduleUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/getGrade")
				.to("direct:getGradeService");
		from("direct:getGradeService").process(new LoginProcessor()).to(getGradeUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/saveCalendarSchdule")
				.to("direct:calendarSchduleService");
		from("direct:calendarSchduleService").process(new CalendarProcessor()).to(calendarSchduleUrl);

        rest("/api/")
                .id("registry-route")
                .consumes("application/json")
                .post("/getAllBranch")
                .to("direct:getAllBranchService");
        from("direct:getAllBranchService").process(new RegistryProcessor()).to(getAllBranchUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/getStaffList")
				.to("direct:getStaffListService");
		from("direct:getStaffListService").process(new CalendarProcessor()).to(getStaffListUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/dayBranchStaffInfo")
				.to("direct:dayBranchStaffInfoService");
		from("direct:dayBranchStaffInfoService").process(new CalendarProcessor()).to(dayBranchStaffInfoUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/saveBranchCalendar")
				.to("direct:saveBranchCalendarService");
		from("direct:saveBranchCalendarService").process(new CalendarProcessor()).to(saveBranchCalendarUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/updateDistributeTask")
				.to("direct:updateDistributeTaskService");
		from("direct:updateDistributeTaskService").process(new CalendarProcessor()).to(updateDistributeTaskUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/getDistributeTaskList")
				.to("direct:getDistributeTaskListService");
		from("direct:getDistributeTaskListService").process(new CalendarProcessor()).to(getDistributeTaskListUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/getBranchInfo")
				.to("direct:getBranchInfoService");
		from("direct:getBranchInfoService").process(new CalendarProcessor()).to(getBranchInfoUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/delBranchInfo")
				.to("direct:delBranchInfoService");
		from("direct:delBranchInfoService").process(new CalendarProcessor()).to(delBranchInfoUrl);

		rest("/api/")
				.id("daySchedule-route")
				.consumes("application/json")
				.post("/editBranchInfo")
				.to("direct:editBranchInfoService");
		from("direct:editBranchInfoService").process(new CalendarProcessor()).to(editBranchInfoUrl);
		
		rest("/api/")
		  .id("usrcheck-route")
		  .consumes("application/json")
		  .post("/usrcheck")
		  .to("direct:usrcheckService");
		from("direct:usrcheckService").process(new Processor() {
		   
			@Override
			public void process(Exchange exchange) throws Exception {
				InputStream body = null;
				body = exchange.getIn().getBody(InputStream.class);
				String data = CamelProcessorUtils.setHttpBody(body);
		        exchange.getOut().setHeader("content-type", "application/json");
		        exchange.getOut().setBody(data);
			}
		  }).to(usernameCheckUrl);
		
		rest("/api/")
		  .id("apps-route")
		  .consumes("application/json")
		  .post("/apps")
		  .to("direct:appsService");
		from("direct:appsService").process(new Processor() {
			
			@Override
			public void process(Exchange exchange) throws Exception {
				InputStream body = null;
				body = exchange.getIn().getBody(InputStream.class);
				String data = CamelProcessorUtils.setHttpBody(body);
		        exchange.getOut().setHeader("content-type", "application/json");
		        exchange.getOut().setBody(data);
			}
		  }).to(appsOverviewUrl);
	}

}
