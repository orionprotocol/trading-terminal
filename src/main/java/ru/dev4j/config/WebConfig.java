package ru.dev4j.config;

import freemarker.cache.WebappTemplateLoader;
import freemarker.template.TemplateExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import javax.servlet.ServletContext;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"ru.dev4j.web"})
public class WebConfig extends WebMvcConfigurerAdapter {

    @Autowired
    private ServletContext servletContext;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
    }

    @Bean
    public FreeMarkerViewResolver freeMarkerViewResolver() {
        FreeMarkerViewResolver fvr = new FreeMarkerViewResolver();
        fvr.setCache(false);
        fvr.setPrefix("");
        fvr.setSuffix(".ftl");
        fvr.setRequestContextAttribute("rc");
        fvr.setContentType("text/html; charset=UTF-8");
        return fvr;
    }

    @Bean
    public FreeMarkerConfigurer freeMarkerConfigurer() {

        freemarker.template.Configuration configuration =
                new freemarker.template.Configuration(freemarker.template.Configuration.VERSION_2_3_20);
        configuration.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
        configuration.setAPIBuiltinEnabled(true);
        configuration.setDefaultEncoding("utf-8");
        configuration.setTemplateLoader(new WebappTemplateLoader(servletContext, "/WEB-INF/view"));

        FreeMarkerConfigurer fmc = new FreeMarkerConfigurer();
        fmc.setConfiguration(configuration);

        return fmc;
    }

}
