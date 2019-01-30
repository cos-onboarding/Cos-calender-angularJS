package com.example.demo.camel.processor;

import java.io.InputStream;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.stereotype.Component;

import com.example.demo.utils.CamelProcessorUtils;

@Component("loginProcessor")
public class LoginProcessor implements Processor {
	
	
	@Override
	public void process(Exchange exchange) throws Exception {
		System.out.println("<==============================login================================>");
		InputStream body = null;
		body = exchange.getIn().getBody(InputStream.class);
		String data = CamelProcessorUtils.setHttpBody(body);

        exchange.getOut().setHeader("content-type", "application/json");

        exchange.getOut().setBody(data);

	}
	
}
