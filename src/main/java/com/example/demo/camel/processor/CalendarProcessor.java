package com.example.demo.camel.processor;

import com.example.demo.utils.CamelProcessorUtils;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component("CalendarProcessor")
public class CalendarProcessor implements Processor {
    @Override
    public void process(Exchange exchange) throws Exception {
        System.out.println("<==============================Calender================================>");
        InputStream body = null;
        body = exchange.getIn().getBody(InputStream.class);
        String data = CamelProcessorUtils.setHttpBody(body);

        exchange.getOut().setHeader("content-type", "application/json");

        exchange.getOut().setBody(data);

    }
}
