package com.example.demo.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;


public class CamelProcessorUtils {

	public static String setHttpBody(InputStream body) throws Exception {

		BufferedReader in = new BufferedReader(new InputStreamReader(body));
        StringBuffer strbf = new StringBuffer("");
        String str = null;
        str = in.readLine();
        while (str != null) {
            strbf.append(str + " ");
            str = in.readLine();
        }
 
		return strbf.toString();		
	}

}
