package com.marox.gatewayserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;

@SpringBootApplication
public class GatewayserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayserverApplication.class, args);
	}

	// Add this CORS configuration bean
	@Bean
	public CorsWebFilter corsWebFilter() {
		CorsConfiguration corsConfig = new CorsConfiguration();
		corsConfig.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
		corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		corsConfig.setAllowedHeaders(Collections.singletonList("*"));
		corsConfig.setAllowCredentials(true);
		corsConfig.setMaxAge(3600L);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfig);

		return new CorsWebFilter(source);
	}

	@Bean
	public RouteLocator maroxRouteConfig(RouteLocatorBuilder routeLocatorBuilder) {
		return routeLocatorBuilder.routes()
				.route(p -> p
						.path("/marox/users/**")
						.filters( f -> f.rewritePath("/marox/users/(?<segment>.*)","/${segment}")
								.addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
//								.circuitBreaker(config -> config.setName("usersCircuitBreaker")
//										.setFallbackUri("forward:/contactSupport")
//								)
								.retry(retryConfig -> retryConfig.setRetries(5)
										.setMethods(HttpMethod.GET)
										.setBackoff(Duration.ofMillis(100),Duration.ofMillis(1000),2,true)
								)
						)
						.metadata("connect-timeout", 1000)
						.metadata("response-timeout", 4000)
						.uri("lb://USERS"))
				.route(p -> p
						.path("/marox/posts/**")
						.filters( f -> f.rewritePath("/marox/posts/(?<segment>.*)","/${segment}")
								.addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
//								.circuitBreaker(config -> config.setName("postsCircuitBreaker")
//										.setFallbackUri("forward:/contactSupport")
//								)
								.retry(retryConfig -> retryConfig.setRetries(4)
										.setMethods(HttpMethod.GET)
										.setBackoff(Duration.ofMillis(100),Duration.ofMillis(1000),2,true)
								)
								.requestRateLimiter(config -> config.setRateLimiter(redisRateLimiter())
										.setKeyResolver(userKeyResolver())
								)
						)
						.uri("lb://POSTS"))
				.route(p -> p
						.path("/marox/comments/**")
						.filters( f -> f.rewritePath("/marox/comments/(?<segment>.*)","/${segment}")
								.addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
//								.circuitBreaker(config -> config.setName("commentsCircuitBreaker")
//										.setFallbackUri("forward:/contactSupport")
//								)
								.retry(retryConfig -> retryConfig.setRetries(4)
										.setMethods(HttpMethod.GET)
										.setBackoff(Duration.ofMillis(100),Duration.ofMillis(1000),2,true)
								)
						)
						.uri("lb://COMMENTS")).build();

	}

	@Bean
	public RedisRateLimiter redisRateLimiter() {
		return new RedisRateLimiter(4, 4, 1);
	}

	@Bean
	KeyResolver userKeyResolver() {
		return exchange -> Mono.justOrEmpty(exchange.getRequest().getHeaders().getFirst("user"))
				.defaultIfEmpty("anonymous");
	}

}
